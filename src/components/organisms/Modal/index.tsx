import { ReactNode, useEffect } from "react";
import ReactDom from "react-dom";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, []);

  return (
    <div className="modal">
      <div>{children}</div>
    </div>
  );
}

interface TitleProps {
  children: string;
}

function Title({ children }: TitleProps) {
  return (
    <div>
      <h3 style={{ padding: 2 }}>{children}</h3>
    </div>
  );
}

interface BodyProps {
  children: ReactNode;
}

function Body({ children }: BodyProps) {
  return (
    <div>
      <p style={{ padding: 3, whiteSpace: "pre-wrap" }}>{children}</p>
    </div>
  );
}

interface FooterProps {
  children: ReactNode;
}

function Footer({ children }: FooterProps) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
      {children}
    </div>
  );
}

interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps) {
  const el = document.getElementById("modal-root") as HTMLElement;

  return ReactDom.createPortal(children, el);
}

export default Object.assign(Modal, {
  Layout,
  Title,
  Body,
  Footer,
});
