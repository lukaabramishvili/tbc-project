import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <ul className="dark:text-white">
        <li className="dark:hover:bg-white dark:hover:text-black">
          <Link data-cy="nav-home" href="/">Home</Link>
        </li>
        <li className="dark:hover:bg-white dark:hover:text-black">
          <Link data-cy="nav-products" href="/products">Products</Link>
        </li>
        <li className="dark:hover:bg-white dark:hover:text-black">
          <Link data-cy="nav-contact" href="/contact">Contact</Link>
        </li>
        <li className="dark:hover:bg-white dark:hover:text-black">
          <Link data-cy="nav-about" href="/about">About</Link>
        </li>
        <li className="dark:hover:bg-white dark:hover:text-black">
          <Link data-cy="nav-posts" href="/posts">Posts</Link>
        </li>
        <li className="dark:hover:bg-white dark:hover:text-black">
          <Link data-cy="nav-pricing" href="/pricing">pricing</Link>
        </li>
      </ul>
    </nav>
  );
}
