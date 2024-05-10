import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [links, setLinks] = useState(() => {
    // Load links from localStorage or initialize them if not present
    const storedLinks = localStorage.getItem('socialMediaLinks');
    return storedLinks ? JSON.parse(storedLinks) : {
      twitter: '',
      facebook: '',
      instagram: '',
      linkedin: '',
    };
  });

  useEffect(() => {
    // Save links to localStorage whenever links state changes
    localStorage.setItem('socialMediaLinks', JSON.stringify(links));
  }, [links]);

  const handleLinkChange = (platform, value) => {
    setLinks((prevLinks) => ({
      ...prevLinks,
      [platform]: value,
    }));
  };

  const handleCopyLink = (platform) => {
    const link = links[platform];
    if (link) {
      navigator.clipboard.writeText(link)
        .then(() => {
          console.log(`Link for ${platform} copied to clipboard: ${link}`);
          // You can add feedback here if needed
        })
        .catch((error) => {
          console.error('Failed to copy link to clipboard:', error);
        });
    }
  };

  const handleSave = () => {
    // Save links to localStorage when the "Save" button is clicked
    localStorage.setItem('socialMediaLinks', JSON.stringify(links));
    // Close the extension window after saving
    window.close();
  };

  return (
    <div className='box'>
      <div className="saveit"><h1>save it!!</h1></div>
      <div className="social-media-links">
        <div className="social-media-link">
          <label>Twitter:   </label>
          <input
            type="text"
            value={links.twitter}
            onChange={(e) => handleLinkChange('twitter', e.target.value)}
          />
          <button onClick={() => handleCopyLink('twitter')}>Copy</button>
        </div>
        <div className="social-media-link">
          <label>Github:</label>
          <input
            type="text"
            value={links.facebook}
            onChange={(e) => handleLinkChange('facebook', e.target.value)}
          />
          <button onClick={() => handleCopyLink('facebook')}>Copy</button>
        </div>
        <div className="social-media-link">
          <label>Instagram:</label>
          <input
            type="text"
            value={links.instagram}
            onChange={(e) => handleLinkChange('instagram', e.target.value)}
          />
          <button onClick={() => handleCopyLink('instagram')}>Copy</button>
        </div>
        <div className="social-media-link">
          <label>LinkedIn:</label>
          <input
            type="text"
            value={links.linkedin}
            onChange={(e) => handleLinkChange('linkedin', e.target.value)}
          />
          <button onClick={() => handleCopyLink('linkedin')}>Copy</button>
        </div>
      </div>
      <div className="save">
      <button className='save' onClick={handleSave}>Save</button>
      </div>
      
    </div>
  );
}

export default App;
