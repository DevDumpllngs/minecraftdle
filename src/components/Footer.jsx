import { FaDiscord, FaTwitter, FaGamepad } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="absolute bottom-5 flex space-x-6 text-white text-2xl">
      <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
        <FaDiscord />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
        <FaTwitter />
      </a>
      <a href="#" className="hover:text-green-500 transition">
        <FaGamepad />
      </a>
    </div>
  );
};

export default Footer;
