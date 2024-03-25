import { Box, Button, Card, IconButton, styled } from "@mui/material";
import { FacebookRounded, GitHub, LinkedIn, Twitter } from "@mui/icons-material";
// CUSTOM COMPONENTS
import { FlexBox } from "components/flexbox";
import { Paragraph } from "components/typography";
import { Link as RouterLink } from "components/link";

// STYLED COMPONENT
const StyledCard = styled(Card)(({
  theme
}) => ({
  gap: 16,
  padding: 24,
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  "& .buttons": {
    textAlign: "right"
  },
  [theme.breakpoints.down(655)]: {
    justifyContent: "center",
    textAlign: "center"
  }
}));
const StyledLink = ({
  href,
  title
}) => <Box href={href} component={RouterLink} sx={{
  color: "text.secondary",
  "&:hover": {
    color: "text.primary"
  }
}}>
    {title}
  </Box>;
const Footer = () => {
  return <StyledCard>
      <div>
        <Paragraph fontSize={20} fontWeight={600}>
          Essence Admin Template
        </Paragraph>

        <Paragraph color="text.secondary" mb={3}>
          Clean UI & well documented
        </Paragraph>

        <Button>Buy Now</Button>
      </div>

      <div>
        <Box className="buttons" mb={1}>
          <IconButton>
            <Twitter />
          </IconButton>

          <IconButton>
            <LinkedIn />
          </IconButton>

          <IconButton>
            <FacebookRounded />
          </IconButton>

          <IconButton>
            <GitHub />
          </IconButton>
        </Box>

        <FlexBox alignItems="center" gap={2}>
          <StyledLink title="About" href="/about" />
          <StyledLink title="Support" href="#" />
          <StyledLink title="Terms & Conditions" href="#" />
        </FlexBox>
      </div>
    </StyledCard>;
};
export default Footer;