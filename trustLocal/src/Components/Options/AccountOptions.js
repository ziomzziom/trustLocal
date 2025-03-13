import React, { useState } from "react";

const AccountOptions = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [legalSpecializations, setLegalSpecializations] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setLinkedinLink("");
    setWebsiteLink("");
    setFacebookLink("");
    setTwitterLink("");
    setCompanyName("");
    setExperienceYears("");
    setLegalSpecializations("");
  };

  return (
    <div className="account-options-container">
      <h2>Account Options</h2>
      <form className="account-options-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="linkedinLink">LinkedIn Link:</label>
          <input
            type="text"
            id="linkedinLink"
            value={linkedinLink}
            onChange={(e) => setLinkedinLink(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="websiteLink">Website Link:</label>
          <input
            type="text"
            id="websiteLink"
            value={websiteLink}
            onChange={(e) => setWebsiteLink(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="facebookLink">Facebook Link:</label>
          <input
            type="text"
            id="facebookLink"
            value={facebookLink}
            onChange={(e) => setFacebookLink(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="twitterLink">Twitter Link:</label>
          <input
            type="text"
            id="twitterLink"
            value={twitterLink}
            onChange={(e) => setTwitterLink(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="experienceYears">Experience Years:</label>
          <input
            type="text"
            id="experienceYears"
            value={experienceYears}
            onChange={(e) => setExperienceYears(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="legalSpecializations">Legal Specializations:</label>
          <input
            type="text"
            id="legalSpecializations"
            value={legalSpecializations}
            onChange={(e) => setLegalSpecializations(e.target.value)}
          />
        </div>

        <button type="submit" className="account-options-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AccountOptions;
