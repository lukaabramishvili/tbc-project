import "./index.css";

export default function Contact() {
  return (
    <div className="contactContainer">
      <h1>Contact</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" placeholder="Enter your name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" placeholder="Your message" required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select id="gender" required>
            <option value="" disabled selected>
              Select your gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="subscribe">
            <input type="checkbox" id="subscribe" />
            Are you sure everything is correct?
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
