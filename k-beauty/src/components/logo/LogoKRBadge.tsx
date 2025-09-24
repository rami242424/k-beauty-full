type Props = {
  size?: number;                
  fill?: string;                
  textColor?: string;           
  text?: string;                
  fontFamily?: string;          
  fontWeight?: number | string; 
  dy?: number;                  
};

export default function LogoKRBadge({
  size = 36,
  fill = "#82DC28",
  textColor = "#111827",
  text = "K-beauty",
  fontFamily = `"Noto Sans KR", system-ui, -apple-system, sans-serif`,
  fontWeight = 700,
  dy = -2,
}: Props) {
  
  const base = size * 0.44;
  const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);
  const perChar = hasKorean ? 1.0 : 0.6;                
  const padding = 0.84;                                 
  const maxWidth = 100 * padding;                       
  const estWidthEm = text.length * perChar;
  const fitScale = Math.min(1, maxWidth / (estWidthEm * base));
  const fontSize = Math.round(base * fitScale);

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={text}>
      <circle cx="50" cy="50" r="50" fill={fill} />
      <text
        x="50"
        y={50 + dy}
        fill={textColor}
        fontSize={fontSize}
        fontWeight={fontWeight}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontFamily, letterSpacing: hasKorean ? "-0.3px" : "0" }}
      >
        {text}
      </text>
    </svg>
  );
}
