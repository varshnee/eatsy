export default function CustomImage({ src, ...rest }) {
  const imageUrl = 'http://localhost:8080/uploads/' + src;
  return <img {...rest} src={imageUrl} alt="" />;
}
