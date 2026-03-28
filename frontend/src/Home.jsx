function Home({ setView }) {
  return (
    <div className="container">
      <h1>StayNest</h1>
      <p className="subtitle">Your perfect stay, just a click away.</p>
      
      <div className="home-actions">
        <button onClick={() => setView('LOGIN')}>Login</button>
        <button className="secondary" onClick={() => setView('REGISTER')}>Register</button>
      </div>

      <div className="features">
        {/* <div className="feature-card">
          <h3>Wide Selection</h3>
          <p>Choose from thousands of hotels worldwide.</p>
        </div> */}
        <div className="feature-card">
          <h3>Best Prices</h3>
          <p>Competitive rates guaranteed for every stay.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
