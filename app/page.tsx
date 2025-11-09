"use client";
import { useEffect, useState } from "react";
import { Wallet } from "@coinbase/onchainkit/wallet";
import { useMiniKit } from "@coinbase/onchainkit/minikit";

// Composant SVG simple pour la sphere avec "Base"
const BaseSphere = () => (
  <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
    <svg width="150" height="150" viewBox="0 0 200 200">
      <defs>
        <radialGradient id="sphereGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: "#0077be", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#4fc3f7", stopOpacity: 0.8 }} />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="url(#sphereGrad)" stroke="#e3f2fd" strokeWidth="1" />
      <text x="100" y="110" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="600" fill="white" textAnchor="middle" dy=".3em">
        Base
      </text>
    </svg>
  </div>
);

export default function Home() {
  const { setMiniAppReady, isMiniAppReady, context } = useMiniKit();
  
  // Etat simple pour les votes
  const [userVote, setUserVote] = useState<string | null>(null);
  const [votesCount, setVotesCount] = useState({ oui: 0, non: 0 });

  useEffect(() => {
    if (!isMiniAppReady) {
      setMiniAppReady();
    }
  }, [setMiniAppReady, isMiniAppReady]);

  // Infos utilisateur
  const userFid = context?.user?.fid;
  const username = context?.user?.username;
  const displayName = context?.user?.displayName;

  // Fonction pour voter
  const handleVote = (option: string) => {
    if (userVote) return;
    setUserVote(option);
    setVotesCount(prev => ({
      ...prev,
      [option]: prev[option as keyof typeof prev] + 1
    }));
  };

  // Styles epures et elegants
  const pageStyle = {
    fontFamily: "system-ui, -apple-system, sans-serif",
    backgroundColor: "white",
    minHeight: "100vh",
    color: "#333",
    lineHeight: 1.6
  };

  const containerStyle = {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "40px 20px"
  };

  const sectionStyle = {
    margin: "30px 0",
    padding: "20px",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    backgroundColor: "#fafafa"
  };

  const buttonStyle = (selected: boolean) => ({
    padding: "12px 24px",
    margin: "8px",
    background: selected ? "#0077be" : "white",
    color: selected ? "white" : "#0077be",
    border: "1px solid #0077be",
    borderRadius: "8px",
    cursor: userVote ? "default" : "pointer",
    fontWeight: 500,
    transition: "all 0.2s ease"
  });

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <header style={{ marginBottom: "40px", textAlign: "center" }}>
          <Wallet />
        </header>
        
        <BaseSphere />
        <h1 style={{ fontSize: "1.8em", fontWeight: 600, color: "#0077be", margin: "0 0 30px", textAlign: "center" }}>
          Airdrop Base Poll
        </h1>
        
        {/* Section Contexte */}
        <section style={sectionStyle}>
          <h2 style={{ fontSize: "1.2em", margin: "0 0 10px", color: "#0077be" }}>Votre Contexte</h2>
          {userFid ? (
            <div style={{ textAlign: "center", fontSize: "0.95em" }}>
              <p><strong>FID :</strong> {userFid}</p>
              {username && <p><strong>@</strong>{username}</p>}
              {displayName && <p><strong>Nom :</strong> {displayName}</p>}
            </div>
          ) : (
            <p style={{ fontStyle: "italic", color: "#666" }}>Connectez-vous via Farcaster.</p>
          )}
        </section>

        {/* Sondage */}
        <section style={sectionStyle}>
          <h2 style={{ fontSize: "1.2em", margin: "0 0 20px", color: "#0077be" }}>
            Penses-tu avoir une part de l'airdrop Base ?
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexDirection: "column", alignItems: "center" }}>
            <button 
              onClick={() => handleVote("oui")}
              disabled={!!userVote}
              style={buttonStyle(userVote === "oui")}
            >
              Oui ({votesCount.oui})
            </button>
            <button 
              onClick={() => handleVote("non")}
              disabled={!!userVote}
              style={buttonStyle(userVote === "non")}
            >
              Non ({votesCount.non})
            </button>
          </div>
          {userVote && (
            <p style={{ marginTop: "15px", fontSize: "0.95em", color: "#0077be", fontWeight: 500, textAlign: "center" }}>
              Merci pour votre vote.
            </p>
          )}
        </section>

        {/* Footer */}
        <footer style={{ 
          marginTop: "50px", 
          padding: "20px", 
          textAlign: "center", 
          color: "#9ca3af", 
          fontSize: "0.85em",
          borderTop: "1px solid #e5e7eb"
        }}>
          Mini app créée par <strong>L&apos;
            rifton92</strong>
        </footer>
      </div>
    </div>
  );
}