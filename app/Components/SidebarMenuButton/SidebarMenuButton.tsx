const SidebarMenuButton = ({
  content,
  anchor,
  changeComponent,
}: {
  content: string;
  anchor: string;
  changeComponent: (componentToLoad: string) => void;
}) => {
  return (
    <button
      style={{
        width: "90%",
        height: "40px",
        padding: "10px 20px",
        margin: "5px",
        color: "white",
        backgroundColor: "#282c34",
        textDecoration: "none",
        borderRadius: "10px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontSize: "15px",
        cursor: "pointer",
      }}
      onClick={() => changeComponent(anchor)}
    >
      {content}
    </button>
  );
};

export default SidebarMenuButton;
