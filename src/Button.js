export const Input = () => {
  return <input />;
};

const Button = ({ value, onChange }) => {
  return (
    <button
      onClick={() => {
        onChange(!value);
      }}
    >
      test {`${value}`}
    </button>
  );
};

export default Button;
