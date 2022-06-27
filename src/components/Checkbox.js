export default function Checkbox({ className, text, ...rest }) {
  return (
    <label className={className}>
      <input {...rest} type="checkbox" />
      <span>{text}</span>
    </label>
  );
}
