export const NavItem = (item) => {
  return (
    <>
      <li>
        <a href={item.link} className="sub-Link">
          {item.name}
        </a>
      </li>
    </>
  );
};
