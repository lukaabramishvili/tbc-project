import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <ul className="dark:text-white ">
        <li className="dark:hover:bg-white dark:hover:text-black">
          <Link href="/">Home</Link>
        </li>
        <li className="dark:hover:bg-white dark:hover:text-black">
          <Link href="/products">Products</Link>
        </li>
        <li className="dark:hover:bg-white dark:hover:text-black">
          <Link href="/contact">Contact</Link>
        </li>
        <li className="dark:hover:bg-white dark:hover:text-black">
          <Link href="/about">About</Link>
        </li>
        <li className="dark:hover:bg-white dark:hover:text-black">
          <Link href="/posts">Posts</Link>
        </li>
      </ul>
    </nav>
  );
}
