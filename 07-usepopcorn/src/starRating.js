const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px"
};
const starContainerStyle = {
    display: "flex",
    gap: "4px"
};
const textStyle = {
    lineHeight: "1",
    margin: "10px"
};

export default function StartRating({ maxRating = 5 }) {
    return (
        <div style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({ length: maxRating }, (_, i) => (
                    <span>S{i}</span>
                ))}
            </div>
            <p style={textStyle}>10</p>
        </div>
    );
}
