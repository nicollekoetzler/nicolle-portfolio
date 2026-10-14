import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Nicolle Koetzler, Product Designer and Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NK_PATHS = [
  "M22.9233 1.14441e-05V35.5002H19.6172V1.14441e-05H22.9233ZM22.544 17.5604L40.5921 1.14441e-05H44.928V0.108407L26.1753 17.994L22.544 17.5604ZM22.544 17.5604L25.9043 16.5306L45.741 35.3918V35.5002H41.0799L22.544 17.5604Z",
  "M2.33055 0.86719L2.43895 1.14441e-05H5.36568L20.8123 34.633L20.7581 35.5002H17.8314L2.33055 0.86719ZM22.7635 35.5002H19.891L19.62 1.14441e-05H22.7635V35.5002ZM3.14353 35.5002H0V1.14441e-05H2.87254L3.14353 35.5002Z",
];

const roles = ["DEVELOPER", "DESIGNER", "THINKER", "+10 YEARS EXPERIENCE"];

export default async function OpengraphImage() {
  const dir = join(process.cwd(), "app/og");
  const [display, body, light, photo] = await Promise.all([
    readFile(join(dir, "instrument-sans-latin-500-normal.woff")),
    readFile(join(dir, "inter-latin-400-normal.woff")),
    readFile(join(dir, "inter-latin-300-normal.woff")),
    readFile(join(dir, "photo.jpg")),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#efefef",
          fontFamily: "Inter",
          color: "#222",
        }}
      >
        {/* soft glows, as on the site */}
        <div
          style={{
            position: "absolute",
            left: -260,
            top: -260,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(140,150,255,0.45), rgba(239,239,239,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -300,
            bottom: -320,
            width: 820,
            height: 820,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(255,214,170,0.45), rgba(239,239,239,0) 70%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 0 60px 72px", width: 740 }}>
          <svg width="56" height="44" viewBox="0 0 46 36" fill="#222">
            {NK_PATHS.map((d) => (
              <path key={d} d={d} />
            ))}
          </svg>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {roles.map((role) => (
                <div
                  key={role}
                  style={{
                    display: "flex",
                    padding: "8px 16px",
                    border: "1.5px dashed rgba(0,0,0,0.2)",
                    borderRadius: 100,
                    fontFamily: "Inter Light",
                    fontSize: 15,
                    color: "rgba(0,0,0,0.55)",
                  }}
                >
                  {role}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", fontFamily: "Instrument Sans", fontSize: 52, lineHeight: 1.12, letterSpacing: -0.3 }}>
              <div style={{ display: "flex" }}>
                Hey! I&apos;m&nbsp;<span style={{ color: "#7e8383" }}>Nicolle Koetzler</span>,
              </div>
              <div>a Product Designer and</div>
              <div>Software Engineer.</div>
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 22, color: "#3a3a3e" }}>nicollekoetzler.com</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", paddingLeft: 24 }}>
          <img
            src={photoSrc}
            width={360}
            height={480}
            style={{ objectFit: "cover", borderRadius: 36 }}
            alt=""
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Sans", data: display, weight: 500, style: "normal" },
        { name: "Inter", data: body, weight: 400, style: "normal" },
        { name: "Inter Light", data: light, weight: 300, style: "normal" },
      ],
    },
  );
}
