
import { FC, ReactElement, ReactNode } from "react";
import "./Loader1.css";

const Loader1: FC = (): ReactElement<any, any> | null => {

    return(
        // <div className="loader_container">
            <svg  width="28" height="24" viewBox="0 0 124 124" className="marginAuto">
                <g>
                    <path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#338877"/>
                    <path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#cde2dd" transform="rotate(45 64 64)"/>
                    <path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#cde2dd" transform="rotate(90 64 64)"/>
                    <path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#cde2dd" transform="rotate(135 64 64)"/>
                    <path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#cde2dd" transform="rotate(180 64 64)"/>
                    <path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#cde2dd" transform="rotate(225 64 64)"/>
                    <path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#cde2dd" transform="rotate(270 64 64)"/>
                    <path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#cde2dd" transform="rotate(315 64 64)"/>
                    <animateTransform attributeName="transform" type="rotate" values="0 64 64;45 64 64;90 64 64;135 64 64;180 64 64;225 64 64;270 64 64;315 64 64" calcMode="discrete" dur="880ms" repeatCount="indefinite"></animateTransform>
                </g>
            </svg>
        // </div>

    )
}

export default Loader1;