import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <div >
      <nav className="navbar navbar-expand-lg navbar-dark bg-info mb-4">
        <div className="container-fluid">
          <a className="navbar-brand " href="#">
            <p className="fs-2">PokPokBank</p>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
