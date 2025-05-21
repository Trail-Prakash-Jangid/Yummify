// CustomArrows.jsx

export const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        right: "-40px",
        background: "orange",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        zIndex: 1,
        color: "black",
      }}
    >
      ❯
    </div>
  );
};

export const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        left: "-40px",
        background: "orange",
        borderRadius: "50%",
        width: "35px",
        height: "35px",
        zIndex: 1,
        color: "white",
      }}
    >
      ❮
    </div>
  );
};
