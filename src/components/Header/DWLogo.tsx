import * as React from "react";
import AspectRatio, { AspectRatioProps } from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
export default function DWLogo({ sx, ...props }: AspectRatioProps) {
  return (
    <AspectRatio
      ratio="1"
      variant="plain"
      {...props}
      sx={[
        {
          width: 44,
          borderRadius: "sm",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          display: "flex",
          height: 41,
          width: 41,
          overflow: "hidden",
          borderRadius: 8,
          boxShadow: (theme) => theme.shadow["sm"],
        }}
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/doc-generator-dev.appspot.com/o/logo_try2_128.png?alt=media&token=faf59777-9c72-4dc1-84ea-40c59870a257"
          height="42"
          alt="contraconnect logo"
        />
      </Box>
    </AspectRatio>
  );
}
