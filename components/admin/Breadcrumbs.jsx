import Link from "next/link";
import React from "react";

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {/* Always show Home/Dashboard as the first icon link */}
        <li className="inline-flex items-center">
          <Link
            href="/admin"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-orange-600 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            Dashboard
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} aria-current={isLast ? "page" : undefined}>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                {isLast || !item.href ? (
                  /* Current Page (Active) - Bold and no link */
                  <span className="text-sm font-bold text-gray-800">
                    {item.label}
                  </span>
                ) : (
                  /* Middle Parent Pages - Clickable link */
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-gray-500 hover:text-orange-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;