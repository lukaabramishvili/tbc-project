import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="not-found-section">
      <h1>Oops! Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/" style={{ color: "blue", textDecoration: "underline" }}>
        Go back home
      </Link>
    </div>
  );
}
