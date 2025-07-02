const ErrorComponent = ({
  errorMessage,
  closeMessage = () => {},
}: {
  errorMessage: string;
  closeMessage?: () => void;
}) => {
  return (
    <div
      style={{
        padding: "10px 20px",
        backgroundColor: "wheat",
        color: "red",
        borderRadius: "5px",
        fontWeight: "bold",
        cursor: "pointer",
      }}
      onClick={closeMessage}
    >
      {errorMessage}
    </div>
  );
};

export default ErrorComponent;
