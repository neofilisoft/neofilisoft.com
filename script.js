import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    GoogleAuthProvider, 
    GithubAuthProvider, 
    TwitterAuthProvider, 
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSy...",          
  authDomain: "...",            
  projectId: "...",             
  storageBucket: "...",        
  messagingSenderId: "...",     
  appId: "..."                  // แก้ตรงนี้
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const twitterProvider = new TwitterAuthProvider();

function socialLogin(provider) {
    signInWithPopup(auth, provider)
    .then((result) => {
        console.log("Login Success:", result.user);
    })
    .catch((error) => {
        console.error(error);
        alert("Error: " + error.message);
    });
}

window.logoutUser = () => {  
    signOut(auth).then(() => {
        alert("Signed out successfully");
    }).catch((error) => console.error(error));
};

onAuthStateChanged(auth, (user) => {
    const authSection = document.querySelector('.auth-section');
    
    if (user) {
        console.log("User is logged in:", user.displayName);
        
        authSection.innerHTML = `
            <h2>Welcome, ${user.displayName}</h2>
            <p style="color: #ccc; margin-bottom: 20px;">You are logged in.</p>
            <button onclick="logoutUser()" class="btn-auth login" style="color: #ff4444; border-color: #ff4444;">Log Out</button>
        `;
    } else {
        console.log("User is logged out");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const googleBtn = document.getElementById('google-login');
    const githubBtn = document.getElementById('github-login');
    const twitterBtn = document.getElementById('twitter-login');
    const fbBtn = document.getElementById('facebook-login');

    if (googleBtn) googleBtn.addEventListener('click', (e) => { e.preventDefault(); socialLogin(googleProvider); });
    if (githubBtn) githubBtn.addEventListener('click', (e) => { e.preventDefault(); socialLogin(githubProvider); });
    if (twitterBtn) twitterBtn.addEventListener('click', (e) => { e.preventDefault(); socialLogin(twitterProvider); });
});
