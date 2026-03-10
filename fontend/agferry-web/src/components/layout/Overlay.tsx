type Pors ={
    isMenuOpen: boolean;
    closeMenu: ()=> void;
}
const Overlay = ({isMenuOpen, closeMenu}:Pors) => {
  return (
    <>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={closeMenu}
        ></div>
      )}
    </>
  )
}

export default Overlay
