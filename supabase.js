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

  // Calculate and Update Overall Championship Standings
  let wins1st = 0;
  let wins2nd = 0;

  if (data) {
    data.forEach(g => {
      if (g.status === 'ENDED' && g.winner) {
        const w = g.winner.toLowerCase().trim();
        // Robust check for MBA 1st / 2nd Year variants
        if (w.includes('1st')) wins1st++;
        else if (w.includes('2nd') || w.includes('2 nd')) wins2nd++;
        else if (g.team_a && g.winner === g.team_a && g.team_a.toLowerCase().includes('1st')) wins1st++;
        else if (g.team_b && g.winner === g.team_b && g.team_b.toLowerCase().includes('2nd')) wins2nd++;
      }
    });

    const standEl = document.getElementById('overallStandings');
    if (standEl) {
      document.getElementById('wins1st').textContent = wins1st;
      document.getElementById('wins2nd').textContent = wins2nd;
      standEl.style.display = 'block';
    }
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
          // Only show 'Winner-only event' if NOT ended. If ended, show nothing (cleaner ui)
          if (game.status !== 'ENDED') {
            scoreHTML += `<p style="text-align: center; color: #666; font-style: italic; margin-top: 10px;">Winner-only event</p>`;
          }
        }
        else if (game.score_a || game.score_b) {
          const isVolleyEnded = ['volleyball', 'throwball', 'handball'].includes(game.sport) && game.status === 'ENDED';
          const isKadamTaal = game.sport.toLowerCase().includes('kadam') || game.sport.toLowerCase().includes('musical');

          const cleanName = (name, defaultName) => {
            if (isKadamTaal) return '';
            if (!name || typeof name !== 'string' || name.trim() === '' || name.trim() === '-' || name.trim() === '—') return defaultName;
            return name;
          };

          if (isVolleyEnded) {
            // TABLE VIEW FOR DASHBOARD
            const keys = game.set_scores ? Object.keys(game.set_scores).sort() : [];
            const winsA = (game.set_winners || []).filter(w => w === 'team_a').length;
            const winsB = (game.set_winners || []).filter(w => w === 'team_b').length;

            scoreHTML += `<div style="text-align:center; font-size:12px; font-weight:bold; color:#059669; margin-bottom:4px;">FINAL SETS: ${winsA} - ${winsB}</div>`;

            let table = '<table style="width:100%; border-collapse:collapse; font-size:13px; background:rgba(255,255,255,0.5); border-radius:4px;">';
            // Header
            table += '<tr style="border-bottom:1px solid #a7f3d0; color:#065f46;"><th style="text-align:left; padding:4px;">Team</th>';
            keys.forEach(k => table += `<th style="padding:4px;">${k.replace('set', 'S')}</th>`);
            table += '</tr>';

            // Row A
            table += `<tr><td style="padding:4px; font-weight:bold;">${cleanName(game.team_a, 'MBA 1st Year')}</td>`;
            keys.forEach(k => {
              const s = game.set_scores[k];
              const isW = s.winner === 'team_a' || parseInt(s.score_a) > parseInt(s.score_b);
              table += `<td style="text-align:center; color:${isW ? '#059669' : '#333'}; font-weight:${isW ? 'bold' : 'normal'};">${s.score_a}</td>`;
            });
            table += '</tr>';

            // Row B
            table += `<tr><td style="padding:4px; font-weight:bold;">${cleanName(game.team_b, 'MBA 2nd Year')}</td>`;
            keys.forEach(k => {
              const s = game.set_scores[k];
              const isW = s.winner === 'team_b' || parseInt(s.score_b) > parseInt(s.score_a);
              table += `<td style="text-align:center; color:${isW ? '#059669' : '#333'}; font-weight:${isW ? 'bold' : 'normal'};">${s.score_b}</td>`;
            });
            table += '</tr></table>';

            scoreHTML += table;

          } else {
            // STANDARD VIEW (Live Volley, Cricket, etc.)
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
                  <span class="team-name">${cleanName(game.team_a, 'MBA 1st Year')}</span>
                  <span class="team-score">${game.score_a || '0'}</span>
                </div>
                <div class="team">
                  <span class="team-name">${cleanName(game.team_b, 'MBA 2nd Year')}</span>
                  <span class="team-score">${game.score_b || '0'}</span>
                </div>
              `;
          }

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
