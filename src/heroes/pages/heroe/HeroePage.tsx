import { useParams } from "react-router";

export default function SuperheroApp() {
  const { idSlug = "" } = useParams();

  return <>HeroPage</>;
}
