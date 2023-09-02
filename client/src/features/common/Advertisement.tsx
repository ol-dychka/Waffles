import { Divider, Link } from "@mui/material";
import StyledBox from "../../components/StyledBox";

const Advertisement = () => {
  // should return random ad from API and link to API
  return (
    <StyledBox mt="2rem">
      <img
        src="/mock-ad.jpg"
        alt="ad"
        style={{
          borderRadius: "1rem",
          width: "100%",
        }}
      />
      <Divider
        sx={{
          margin: "0.5rem 0",
        }}
      />
      <Link
        href="https://www.google.com/"
        target="_blank"
        color="inherit"
        underline="hover"
      >
        Ullamco eius turpis ex facilis integer? Blanditiis condimentum
        reiciendis, mattis magnam repudiandae.
      </Link>
    </StyledBox>
  );
};

export default Advertisement;
