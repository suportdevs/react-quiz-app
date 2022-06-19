export default function Checkbox({ text }) {
  return (
    <label>
      <input type="checkbox" />
      <span>{text}</span>
    </label>
  );
}
