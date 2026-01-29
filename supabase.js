// Updated supabase.js with batting/bowling indicator and clickable cards

const SUPABASE_URL = "https://cbyvvnugycxpzrjjudff.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNieXZ2bnVneWN4cHpyamp1ZGZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1MDY3MDIsImV4cCI6MjA4NTA4MjcwMn0.M2LQuMbTB3v4fI4URlIP73tP_THHEYS7xOMp-OBO9RU";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("✅ Supabase client initialized");

async function loadScores() {
  console.log("🔄 Fetching scores from database...");
  console.log("⏰ Current time:", new Date().toLocaleTimeString());

  const { data, error } = await supabaseClient
    .from("scores")
    .select("*")
    .order("game_id");

  if (error) {
    console.error("❌ Supabase error:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    alert("ERROR: Cannot connect to Supabase! Check console for details.");
    return;
  }

  if (!data || data.length === 0) {
    console.warn("⚠️ No data returned from Supabase");
    return;
  }

  console.log("✅ Loaded", data.length, "games");
  console.log("📊 Data:", data);

  // Hide loading state
  const loadingState = document.querySelector('.loading-state');
  if (loadingState) {
    loadingState.style.display = 'none';
  }

  data.forEach(game => {
    const gameCard = document.querySelector(`[data-game-id="${game.game_id}"]`);

    if (!gameCard) {
      console.warn(`⚠️ No card found for game_id ${game.game_id}`);
      return;
    }

    // Make card clickable
    gameCard.style.cursor = 'pointer';
    gameCard.onclick = () => {
      window.location.href = `game.html?id=${game.game_id}`;
    };

    // Add data-status attribute for CSS styling
    console.log(`🎨 Setting status for game ${game.game_id}: ${game.status}`);
    gameCard.setAttribute('data-status', game.status);
    console.log(`✅ Card ${game.game_id} data-status:`, gameCard.getAttribute('data-status'));

    // Update status
    const statusElement = gameCard.querySelector('.game-status');
    if (statusElement) {
      let statusText = `STATUS: ${game.status}`;
      statusElement.textContent = statusText;
      statusElement.className = `game-status status-${game.status}`;
    }

    // Add batting/bowling info for cricket (below status)
    let battingInfoHTML = '';
    if (game.sport === 'cricket' && game.status === 'LIVE' && game.batting_team) {
      const battingTeam = game.batting_team === 'team_a' ? game.team_a : game.team_b;
      const bowlingTeam = game.batting_team === 'team_a' ? game.team_b : game.team_a;
      const inningsText = game.innings_number === 2 ? '2nd Innings' : '1st Innings';

      battingInfoHTML = `
        <div class="batting-info" style="background: #e0f2fe; padding: 10px; border-radius: 6px; margin-bottom: 10px; text-align: center;">
          <div style="font-weight: 700; color: #0369a1; margin-bottom: 5px; font-size: 16px;">${inningsText}</div>
          <div style="font-size: 14px;">🏏 ${battingTeam} batting | ⚾ ${bowlingTeam} bowling</div>
        </div>
      `;
    }

    // Update scores
    const scoresDiv = gameCard.querySelector('.scores');
    if (scoresDiv) {
      if (game.show_score && game.status !== 'UPCOMING') {
        let scoreHTML = battingInfoHTML; // Add batting info first

        // Define winner-only sports (no numeric score shown)
        const winnerOnlySports = ['relay', 'tug of war', 'musical chairs', 'kadam taal'];
        const isWinnerOnly = winnerOnlySports.some(s => game.sport.toLowerCase().includes(s));

        if (isWinnerOnly) {
          scoreHTML += `<p style="text-align: center; color: #666; font-style: italic; margin-top: 10px;">${game.status === 'ENDED' ? 'Event Ended' : 'Winner-only event'}</p>`;
        }
        else if (game.score_a || game.score_b) {
          // For set-based sports: show current set and sets won
          if (['volleyball', 'throwball', 'handball'].includes(game.sport) && game.status === 'LIVE') {
            const currentSet = game.current_set || 1;

            // Calculate sets won
            const winsA = (game.set_winners || []).filter(w => w === 'team_a').length;
            const winsB = (game.set_winners || []).filter(w => w === 'team_b').length;

            // Generate History
            let historyHTML = '';
            if (game.set_scores) {
              const sets = Object.keys(game.set_scores).sort();
              if (sets.length > 0) {
                historyHTML = '<div style="margin-top:4px; font-size:11px; color:#555; display:flex; flex-wrap:wrap; justify-content:center; gap:4px;">';
                sets.forEach(key => {
                  const s = game.set_scores[key];
                  const setN = key.replace('set', '');
                  const sA = s.winner === 'text-green' || s.winner === 'team_a' ? `<b>${s.score_a}</b>` : s.score_a; // heuristic
                  const sB = s.winner === 'team_b' ? `<b>${s.score_b}</b>` : s.score_b;
                  historyHTML += `<span style="background:white; padding:2px 5px; border-radius:4px; border:1px solid #d1fae5;">S${setN}: ${s.score_a}-${s.score_b}</span>`;
                });
                historyHTML += '</div>';
              }
            }

            scoreHTML += `
               <div style="background: #ecfdf5; padding: 5px; border-radius: 4px; margin-bottom: 10px; text-align: center;">
                 <div style="font-weight: 700; color: #059669; font-size: 14px;">SET ${currentSet}</div>
                 <div style="font-size: 12px; color: #666; margin-bottom:2px;">Sets Won: ${winsA} - ${winsB}</div>
                 ${historyHTML}
               </div>
             `;
          }

          scoreHTML += `
            <div class="team">
              <span class="team-name">${(game.team_a && game.team_a.trim()) || 'MBA 1st Year'}</span>
              <span class="team-score">${game.score_a || '0'}</span>
            </div>
            <div class="team">
              <span class="team-name">${(game.team_b && game.team_b.trim()) || 'MBA 2nd Year'}</span>
              <span class="team-score">${game.score_b || '0'}</span>
            </div>
          `;
        } else {
          scoreHTML += '<p style="text-align: center; color: #666;">Score not available yet</p>';
        }

        scoresDiv.innerHTML = scoreHTML;
      } else {
        scoresDiv.innerHTML = '<p style="text-align: center; color: #999;">Score hidden until game starts</p>';
      }
    }

    // Update winner
    const winnerElement = gameCard.querySelector('.winner');
    if (winnerElement) {
      if (game.status === 'ENDED' && game.winner) {
        winnerElement.textContent = `Winner: ${game.winner}`;
        winnerElement.classList.remove('hidden');
      } else {
        winnerElement.classList.add('hidden');
      }
    }
  });

  console.log("✅ UI updated successfully");
}

// Load scores immediately
loadScores();

// Auto-refresh every 3 seconds
setInterval(loadScores, 3000);
console.log("🔄 Auto-refresh enabled (every 3 seconds)");
