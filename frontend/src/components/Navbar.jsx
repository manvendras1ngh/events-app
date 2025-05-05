import brandLogo from "../assets/meetupLogo.png";

const Navbar = () => {
  return (
    <nav>
      <img
        src={brandLogo}
        alt="meetup brand logo"
        className="w-40 inline-block"
      />
    </nav>
  );
};

export default Navbar;
