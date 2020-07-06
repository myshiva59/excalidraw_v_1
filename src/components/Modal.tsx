import "./Modal.scss";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { KEYS } from "../keys";

export const Modal = (props: {
  className?: string;
  children: React.ReactNode;
  maxWidth?: number;
  onCloseRequest(): void;
  labelledBy: string;
  hide: any;
}) => {
  const modalRoot = useBodyRoot(props.hide);

  const handleKeydown = (event: React.KeyboardEvent) => {
    if (event.key === KEYS.ESCAPE) {
      event.nativeEvent.stopImmediatePropagation();
      props.onCloseRequest();
    }
  };
  return createPortal(
    <div
      className={
        (props.hide && `Modal_${props.hide}`) ||
        `Modal ${props.className ?? ""}`
      }
      role="dialog"
      aria-modal="true"
      onKeyDown={handleKeydown}
      aria-labelledby={props.labelledBy}
    >
      {console.log("Hello")}
      <div className="Modal__background" onClick={props.onCloseRequest}></div>
      <div
        className="Modal__content"
        style={
          {
            "--max-width": `${props.maxWidth}px`,
            maxHeight: "100%",
            overflowY: "scroll",
          } as any
        }
      >
        {props.children}
      </div>
    </div>,
    modalRoot,
  );
};

const useBodyRoot = (hide: any) => {
  const createDiv = () => {
    const div = document.createElement("div");
    if (hide === "hide") {
      // div.className = "Modal_hide";
    }
    document.body.appendChild(div);
    return div;
  };
  const [div] = useState(createDiv);
  useEffect(() => {
    return () => {
      document.body.removeChild(div);
    };
  }, [div]);
  return div;
};
