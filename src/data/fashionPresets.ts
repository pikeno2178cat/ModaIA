import { ModelBaseParams } from '../types';

export const ENVIRONMENT_PRESETS = [
  {
    id: 'quarto',
    label: '🏠 Quarto / Casa brasileira (Padrão original - Lived-in home mirror selfie)',
    cleanValue: 'Lived-in home mirror selfie',
    shortLabel: 'Quarto Residencial',
    description: 'Estética clássica residencial brasileira com espelho e detalhes do cotidiano.',
  },
  {
    id: 'provador',
    label: '🏬 Provador de Loja de Roupas (Modern clothing boutique fitting room with bright lights and large mirror)',
    cleanValue: 'Modern clothing boutique fitting room with bright lights and large mirror',
    shortLabel: 'Provador Boutique',
    description: 'Iluminação nítida de loja com espelho amplo e ambiente comercial moderno.',
  },
  {
    id: 'estudio',
    label: '⚪ Fundo Neutro / Estúdio Clean (Clean minimalist neutral solid background, professional commercial lighting)',
    cleanValue: 'Clean minimalist neutral solid background, professional commercial lighting',
    shortLabel: 'Estúdio / Fundo Neutro',
    description: 'Fundo liso minimalista sem distrações, ideal para e-commerce e catálogo oficial.',
  },
  {
    id: 'cafe',
    label: '☕ Cafeteria / Ambiente Urbano Aconchegante (Cozy modern café interior, soft ambient daylight, bokeh background)',
    cleanValue: 'Cozy modern café interior, soft ambient daylight, bokeh background',
    shortLabel: 'Cafeteria Urbana',
    description: 'Lifestyle urbano acolhedor com luz suave natural e fundo desfocado.',
  },
];

export function getCleanEnvironment(tipoCenario: string, customText?: string): string {
  if (tipoCenario.includes('Outro') || tipoCenario === 'custom') {
    return customText?.trim() || 'Modern apartment balcony with plants, natural daylight';
  }
  const preset = ENVIRONMENT_PRESETS.find((p) => p.label === tipoCenario || p.id === tipoCenario);
  if (preset) return preset.cleanValue;
  if (tipoCenario.includes(' - ')) {
    return tipoCenario.split(' - ')[1].replace(/\)+$/, '').trim();
  }
  return tipoCenario.replace(/[()]/g, '').trim();
}

export const HAIR_PRESETS = [
  { label: 'Ondulado Castanho Escuro (Padrão)', value: 'Long wavy dark brown hair' },
  { label: 'Castanho Iluminado Longo', value: 'Long chocolate brown hair with subtle honey balayage highlights and soft beach waves' },
  { label: 'Loiro Dourado Médio', value: 'Shoulder-length warm golden blonde hair with natural texture and subtle waves' },
  { label: 'Cacheado Volumoso 3B/3C', value: 'Voluminous defined curly 3B dark brown hair, bouncy and natural shine' },
  { label: 'Morena Cabelo Preto Liso', value: 'Glossy long sleek straight jet-black hair parted naturally down the center' },
  { label: 'Ruivo Acobreado Natural', value: 'Medium-length natural ginger copper hair with gentle relaxed waves' },
  { label: 'Corte Bob Curto Elegante', value: 'Chic modern dark brunette collarbone bob cut with soft textured ends' },
  { label: 'Tranças Longas Estilosas', value: 'Long neat goddess braids in dark brown tone falling naturally past shoulders' },
];

export const CHARACTERISTICS_PRESETS = [
  { label: 'Padrão Bronzeada Natural', value: 'Warm brown eyes, natural gentle smile, soft tanned Brazilian skin tone' },
  { label: 'Morena Iluminada Carioca', value: 'Warm glowing honey-bronzed skin tone, hazel brown eyes, subtle friendly smile, athletic feminine physique' },
  { label: 'Beleza Natural com Sardas', value: 'Light warm olive skin with subtle sun-kissed freckles across the bridge of nose, warm hazel eyes, relaxed posture' },
  { label: 'Biotipo Curvilíneo Fit', value: 'Healthy golden-tan skin tone, confident warm gaze, naturally toned silhouette, subtle smile' },
  { label: 'Beleza Negra Brasileira Radiante', value: 'Radiant deep melanin skin tone, expressive glowing dark brown eyes, genuine charismatic smile, graceful posture' },
  { label: 'Morena Clara com Traços Suaves', value: 'Warm light tan Brazilian complexion, almond-shaped dark eyes, soft natural cheekbones, friendly expression' },
];

export const PHONE_PRESETS = [
  { label: 'iPhone 17 Laranja (Fórmula Mestre)', value: 'orange iPhone 17' },
  { label: 'iPhone 16 Pro Titânio Preto', value: 'black titanium iPhone 16 Pro' },
  { label: 'iPhone 16 Dourado', value: 'desert titanium iPhone 16 Pro' },
  { label: 'iPhone 15 Branco Natural', value: 'natural white iPhone 15' },
];

export const CLOTHING_PRESETS = [
  {
    title: 'Vestido Canelado Verde Oliva (Original)',
    category: 'Vestidos',
    value: 'Oversized ribbed cotton dress in olive green color',
  },
  {
    title: 'Conjunto Alfaiataria Linho Cru',
    category: 'Conjuntos',
    value: 'Tailored beige linen two-piece set featuring a cropped buttoned sleeveless vest and high-waisted pleated wide-leg trousers',
  },
  {
    title: 'Vestido Midi Floral Romântico Viscose',
    category: 'Vestidos',
    value: 'Fluid viscose midi sundress in delicate terracotta floral print with sweet-heart neckline, thin adjustable straps, and subtle side slit',
  },
  {
    title: 'Top Cropped Canelado + Calça Wide Leg Jeans',
    category: 'Casual',
    value: 'Fitted ribbed black halter cropped top paired with light-wash high-rise wide-leg denim jeans with clean raw-cut hem',
  },
  {
    title: 'Vestido Envelope Transpassado Crepe Terracota',
    category: 'Elegante',
    value: 'Wrap-around midi dress in fluid terracotta crepe duna fabric with V-neckline, waist tie-belt, and graceful fluttering sleeves',
  },
  {
    title: 'Conjunto Fitness Sem Costura Lilás',
    category: 'Fitness',
    value: 'Seamless athletic activewear set in pastel lilac purple, featuring a scoop-neck ribbed sports bra and high-compression scrunch leggings',
  },
  {
    title: 'Biquíni Cortininha Canelado + Saída de Praia',
    category: 'Moda Praia',
    value: 'Textured ribbed triangle bikini in warm rust terracotta with cheeky bottom and matching semi-sheer linen beach wrap skirt',
  },
  {
    title: 'Camisa Oversized Branca + Shorts Alfaiataria',
    category: 'Casual Chic',
    value: 'Relaxed crisp white 100% poplin cotton button-down shirt half-tucked into sage green tailored high-waist linen shorts',
  },
];

export const FABRIC_ENHANCERS = [
  { label: 'Algodão Canelado Ribana', text: 'heavyweight ribbed stretch cotton fabric with distinct vertical rib texture' },
  { label: 'Linho Puro com Textura', text: 'natural textured breathable raw linen weave with subtle organic slubs' },
  { label: 'Crepe Duna Fluido', text: 'lightweight fluid crepe duna fabric with delicate matte pebble texture and beautiful drape' },
  { label: 'Viscose Fresca com Caimento', text: 'soft airy fluid viscose rayon with graceful gravity drape and movement folds' },
  { label: 'Alfaiataria Estruturada', text: 'premium structured tailored twill suiting fabric with sharp pressed seams and clean drape' },
  { label: 'Seda / Cetim Toque Macio', text: 'smooth lustrous satin weave with soft natural ambient light sheen and fluid creases' },
  { label: 'Jeans 100% Algodão', text: 'authentic medium-weight 100% twill cotton denim with subtle vintage wash fading' },
];

export const VIDEO_MOVEMENTS = [
  {
    label: 'Slowly turning around 360 degrees to show the outfit details',
    value: 'Slowly turning around 360 degrees to show the outfit details',
    description: 'Ideal para mostrar frente, costas, fendas e modelagem completa da peça.',
  },
  {
    label: 'Walking towards the camera smiling naturally in the environment',
    value: 'Walking towards the camera smiling naturally in the environment',
    description: 'Movimento orgânico estilo stories/TikTok no cenário selecionado.',
  },
  {
    label: 'Adjusting the clothes with a natural expression',
    value: 'Adjusting the clothes with a natural expression',
    description: 'Gesto autêntico de provador que passa sensação de vida real e confiança.',
  },
  {
    label: 'Showcasing the fabric texture and movement for a TikTok transition video',
    value: 'Showcasing the fabric texture and movement for a TikTok transition video',
    description: 'Foco no caimento, balanço do tecido e close nos acabamentos.',
  },
];

export const VIDEO_TOOLS = [
  { id: 'veo', name: 'Google Veo 2', badge: 'Alta Fidelidade', promptHint: 'Ideal para física de tecido realista e iluminação residencial autêntica.' },
  { id: 'kling', name: 'Kling 1.5 / 2.0', badge: 'Popular TikTok', promptHint: 'Excelente para fluidez corporal e movimentos de provador 9:16.' },
  { id: 'runway', name: 'Runway Gen-3 Alpha', badge: 'Cinematográfico', promptHint: 'Perfeito para controle de câmera e textura realista de pele.' },
  { id: 'luma', name: 'Luma Dream Machine', badge: 'Rápido & Dinâmico', promptHint: 'Ótimo para giros 360º e consistência de ambiente.' },
  { id: 'hailuo', name: 'Minimax / Hailuo', badge: 'Movimento Orgânico', promptHint: 'Destaca expressividade natural e gestos casuais.' },
];

/**
 * Builds the Master Base Model Prompt matching the exact template requested by the user.
 */
export function buildMasterModelPrompt(params: ModelBaseParams): string {
  const cenarioCustomizado = getCleanEnvironment(params.environmentType, params.customEnvironment);

  const platformSuffix =
    params.platform === 'midjourney'
      ? '\n\n--ar 9:16 --v 6.1 --style raw'
      : params.platform === 'flux'
      ? '\n\nFlux.1 Pro/Dev guidance scale: 3.5, 30 steps'
      : '';

  if (params.gender === 'masculino') {
    return `Create an ultra-photorealistic full-body-style vertical 9:16 portrait of a Brazilian male influencer/model in a natural, neutral environment (${cenarioCustomizado}).
Character details:
Gender: Male
Age: [${params.age} years old]
Hair and Beard: [${params.hairColor}]
Physical characteristics: [${params.otherCharacteristics}]
The person should look like a real Brazilian male content creator, with natural masculine facial features, realistic skin texture, small imperfections, believable proportions, and authentic everyday appearance. Avoid an overly perfect, plastic, cinematic, fantasy, or AI-generated look.
Framing and composition: Show the man from approximately the knees up. The framing must clearly show most of his body so he feels like a real fashion/lifestyle influencer. Keep the full upper body, shoulders, torso, waist, hips, and legs visible down to around the knees. Do not crop too tightly on the face or torso.
The environment should be realistic, simple, and adaptable, matching the selected setting: ${cenarioCustomizado}. The background must remain visually secondary to the model.
Use natural daylight or soft indoor lighting. The image should look like a real smartphone photo or a high-quality casual social media photo, not a professional studio photoshoot. Keep the pose relaxed, natural, masculine, and believable, as if he is casually creating content for Instagram or TikTok.

Important requirements:
- Hyper-realistic photography
- Natural Brazilian male appearance
- Realistic and neutral environment: ${cenarioCustomizado}
- Framing from the knees up
- Authentic masculine facial features
- Realistic skin texture, natural expression, realistic masculine body proportions
- Natural posture and body language
- No exaggerated beauty filters, no cinematic color grading, no artificial smooth skin, no doll-like face, no exaggerated muscles unless specified
- No extra fingers, distorted hands, warped face, bad anatomy, strange eyes, text, logos, watermarks, TikTok UI, or social media interface elements

R E S U L T A D O  F I N A L:
Aspect ratio: 9:16 vertical. An extremely realistic and natural adult Brazilian male influencer casually posing in the specified environment, visually indistinguishable from an authentic photo taken with a real camera.${platformSuffix}`;
  }

  return `AGE
[${params.age}+ ONLY — INSERT AGE]

HAIR COLOR
[${params.hairColor}]

OTHER CHARACTERISTICS
[${params.otherCharacteristics}]

Create an ultra-photorealistic vertical 9:16 portrait of an attractive adult Brazilian woman with a feminine,
curvy, fit and naturally voluptuous body. She must clearly look like a real Brazilian woman rather than a fashion
render or AI-generated model. Respect exactly the age, hair color and additional characteristics provided above.
She is standing naturally inside the following environment: ${cenarioCustomizado}.
She is casually taking a smartphone mirror selfie with an ${params.phoneModel} (or holding it in a natural pose if background is neutral). The phone must look authentic, correctly proportioned and physically believable in her hand.
This image will later be used as the reference character for realistic fashion videos, so her identity, facial features,
hairstyle, body proportions, skin tone and overall appearance must be clearly defined and visually consistent.
Give her an attractive Brazilian appearance with realistic anatomy, naturally feminine curves, a defined waist,
proportional hips and legs, and a flattering silhouette. Her body should look naturally fit and curvy, not
exaggerated, artificial, surgically impossible or cartoonish.
Her pose should already resemble the opening frame of a casual TikTok fashion video: confident, subtly
seductive and feminine but still completely believable. She may slightly shift her weight onto one leg, gently angle
one hip, keep the other leg relaxed, subtly arch her posture and hold her free arm naturally beside her body or
lightly near her waist. The pose must look spontaneous rather than professionally choreographed.
Dress her in a simple random fashionable outfit appropriate for an adult woman, such as a fitted casual dress,
matching top-and-skirt set, fitted top with shorts, or stylish athleisure set. The clothing is temporary and should
not visually obscure her overall body proportions, since it will later be replaced with different fashion products.

Environment details: ${cenarioCustomizado}. 
Keep the lighting natural and cohesive with the environment. Avoid exaggerated cinematic studio lighting or artificial glow.

Photographic look: realistic smartphone photography captured with an iPhone 17-class camera, natural
computational HDR, realistic skin texture, subtle pores, tiny imperfections, realistic hair strands, believable fabric
texture, accurate reflections, natural exposure, moderate smartphone sharpening, realistic dynamic range and
subtle sensor processing. Keep the image clean and high quality.

The mirror reflection or framing must be physically accurate. Her body, hands, fingers, smartphone, clothing, room geometry
and reflection must all be coherent.

Her expression should be relaxed, confident and subtly flirtatious, with natural eyes and mouth. Avoid
exaggerated influencer expressions, duck face or an artificial fashion-model stare.

C R I T I C A L  R E A L I S M  R U L E S
photorealistic adult human real skin texture anatomically correct body
anatomically correct hands and fingers natural facial asymmetry
accurate physics and environment lighting realistic body proportions believable gravity natural posture

A V O I D
AI-looking face plastic skin doll-like appearance excessive beauty retouching
unrealistic hourglass anatomy exaggerated breasts or hips distorted hands extra fingers duplicated limbs
warped phone incorrect mirror reflection duplicated objects floating objects impossible clothing
glossy CGI appearance 3D render illustration anime excessive bokeh text captions logos
watermarks interface elements

I M A G E M  R E S U L T A D O  F I N A L
Aspect ratio: ${params.aspectRatio || '9:16 vertical'}. Final result: an extremely realistic, natural, attractive adult Brazilian woman
casually posing in the specified environment, visually indistinguishable from an authentic photo taken by a real person.${platformSuffix}`;
}

/**
 * Builds the Virtual Try-On Prompt by Reference (Image A + Image B) with Environment Lock.
 */
export function buildTryOnABPrompt(): string {
  return `Use Image A as the main identity and environment reference, and Image B exclusively as the clothing reference.
Image A: A PESSOA E O CENÁRIO — identidade a preservar: rosto, cabelo, tipo de corpo, tom de pele, proporções, além de todo o ambiente de fundo, iluminação, espelho e objetos que devem permanecer 100% idênticos.
Image B: A ROUPA — apenas a peça é aproveitada. A pessoa e o fundo da Image B NÃO devem aparecer no resultado.

Image A is the master reference for both the person AND their environment. Keep their face, hair, body type, skin tone, proportions, and overall appearance strictly identical to Image A. 
CRITICAL ENVIRONMENT LOCK: Keep the exact same background environment, room geometry, walls, furniture, props, mirror position, and lighting from Image A. Do not change, modify, or shift the background in any way. Only the clothing must be replaced.

Image B is the outfit reference. Transfer the exact outfit worn by the person in Image B onto the person from Image A. The final result must show the exact same person from Image A, inside their exact same environment from Image A, wearing the clothing from Image B.
Preserve the clothing details from Image B as accurately as possible, including design, colors, fabric appearance, fit, silhouette, straps, sleeves, neckline, waist shape, length, cut, and visible fashion details.

I M P O R T A N T  R E Q U I R E M E N T S:
- preserve 100% the identity of Image A (face, body, pose)
- preserve 100% the environment/background of Image A (no background changes allowed)
- transfer only the outfit details from Image B
- accurate clothing fitting, draping and fabric blending matching the body shape
- realistic mirror reflection and matching lighting

A V O I D:
changing the background, modifying the room, altering the environment, AI-looking face, plastic skin, distorted body, wrong outfit details, warped mirror reflection, extra fingers, duplicated limbs, fake studio lighting, illustration, CGI, text captions, watermark.

R E S U L T A D O  F I N A L:
An extremely realistic 9:16 image of the exact same person from Image A, inside the exact same unchanging environment from Image A, now naturally wearing the exact outfit from Image B.`;
}

/**
 * Builds the Clothing Isolation Prompt (Flat-lay / E-commerce Shot - Passo 1)
 */
export function buildClothingIsolationPrompt(): string {
  return `Use the provided reference image of the person wearing the outfit only to identify and reconstruct the clothing set accurately.

Generate a highly realistic product-only image of the exact outfit shown in the reference, with NO person wearing it.
The final image must show only the outfit pieces separated and clearly visible, isolated from the model. Recreate the clothing faithfully based on the reference image, preserving the exact design, color, fabric appearance, shape, proportions, cut, seams, neckline, straps, waistband, stitching, and all visible construction details.
Show the full outfit as a clean flat-lay product presentation on a plain light background, preferably white or very light neutral. Arrange the pieces neatly so the viewer can clearly see the entire set. If the outfit includes two pieces, show both pieces fully visible and separated, but positioned close together as a matching set.

Important:
- Do not show any person, face, skin, hands, arms, or mannequin.
- Do not show a hanger unless necessary. Do not show the clothing being worn.
- Do not add extra clothing pieces, change the outfit design, or change the colors.
- Do not stylize or redesign the set.

The image should look like a real e-commerce product photo or a realistic flat-lay clothing shot, with soft natural lighting, clean shadows, realistic fabric texture, and high detail. The outfit must look authentic and visually identical to the one in the reference image.
Focus on product fidelity and realism. The result should clearly present the clothing set alone, ready to be used as a reference image for a product demonstration video.`;
}

/**
 * Builds the Virtual Try-On Prompt with Isolated Clothing (Passo 2: Imagem A + B)
 */
export function buildTryOnIsolatedABPrompt(): string {
  return `Use Image A as the main identity and environment reference, and Image B exclusively as the clothing reference.
Image A: A PESSOA E O CENÁRIO — identidade a preservar: rosto, cabelo, tipo de corpo, tom de pele, proporções, além de todo o ambiente de fundo, iluminação, espelho e objetos que devem permanecer 100% idênticos.
Image B: A ROUPA — apenas a peça isolada é aproveitada. 

Image A is the master reference for both the person AND their environment. Keep their face, hair, body type, skin tone, proportions, and overall appearance strictly identical to Image A. 
CRITICAL ENVIRONMENT LOCK: Keep the exact same background environment, room geometry, walls, furniture, props, mirror position, and lighting from Image A. Do not change, modify, or shift the background in any way. Only the clothing must be replaced.

Image B is the outfit reference. Transfer the exact outfit shown in Image B onto the person from Image A. The final result must show the exact same person from Image A, inside their exact same environment from Image A, wearing the clothing from Image B.
Preserve the clothing details from Image B as accurately as possible, including design, colors, fabric appearance, fit, silhouette, straps, sleeves, neckline, waist shape, length, cut, and visible fashion details.

I M P O R T A N T  R E Q U I R E M E N T S:
- preserve 100% the identity of Image A (face, body, pose)
- preserve 100% the environment/background of Image A (no background changes allowed)
- transfer only the outfit details from Image B
- accurate clothing fitting, draping and fabric blending matching the body shape
- realistic mirror reflection and matching lighting

A V O I D:
changing the background, modifying the room, altering the environment, AI-looking face, plastic skin, distorted body, wrong outfit details, warped mirror reflection, extra fingers, duplicated limbs, fake studio lighting, illustration, CGI, text captions, watermark.

R E S U L T A D O  F I N A L:
An extremely realistic 9:16 image of the exact same person from Image A, inside the exact same unchanging environment from Image A, now naturally wearing the exact outfit from Image B.`;
}

/**
 * Builds the Scenario Change Prompt (Image A + Image B) matching Module 3.
 */
export function buildScenarioABPrompt(): string {
  return `Use the two provided images as references. The first image (Image A) serves as the base and must define the final composition, camera angle, perspective, environment, lighting, framing, and background. The second image (Image B) provides the reference for the identity, facial features, hair, body, and appearance of the person who is to be placed into the scene.

Completely place the person from the second image (Image B) into the environment of the first image (Image A), while maintaining the original environment, lighting, and composition of the first image precisely. 
- Preserve 100% of the identity, face, hair, body type, and appearance from Image B. Do not alter her identity.
- Preserve 100% of the environment, background, props, lighting, and camera perspective from Image A.
The final image must look like a natural, realistic photo taken at the same location as the first image, as if the person from Image B were truly standing there in front of the camera.

A V O I D:
Identity drift, changing the person's face or body from Image B, modifying the background environment of Image A, mismatched lighting, CGI look, AI artifacts, distortions.

R E S U L T A D O  F I N A L:
An ultra-realistic photo showing the exact person from Image B naturally integrated into the exact background environment and lighting of Image A.`;
}

/**
 * Builds the Strict UGC Clothing Fit & Pose Prompt matching Module 4.
 */
export function buildStrictPosePrompt(poseDescription: string): string {
  return `STRICT UGC CLOTHING FIT & POSE PROMPT (Image-to-Image / Reference Preservation Workflow):
Using the provided reference image, keep the person's exact face, identity, hair style/color, exact clothing item, and exact background environment 100% identical and unchanged. 
ONLY change their body posture to execute the following realistic UGC try-on action: ${poseDescription}.

CRITICAL FIT & LOCK RULES:
- DO NOT change the clothing piece, color, print, fabric, or texture from the reference. The garment must remain exactly the same.
- DO NOT change her/his face, facial features, hair, or identity.
- DO NOT change, shift, or modify the background environment, room, lighting, or mirror.
- ONLY apply the requested physical interaction with the clothing to realistically demonstrate how the fabric behaves, stretches, drapes, and fits on the body.
- Maintain a natural, authentic smartphone UGC aesthetic (TikTok / Instagram Reels style).

R E S U L T A D O  F I N A L:
An extremely realistic 9:16 vertical smartphone photo maintaining the exact same person, exact same clothing item, and exact same background from the reference image, dynamically capturing the realistic clothing fit and fabric behavior through the specified pose.`;
}

/**
 * 20 Realistic UGC Try-On & Clothing Fit Poses for E-commerce & Fashion
 */
export interface UgcPoseItem {
  id: number;
  title: string;
  description: string;
}

export const UGC_POSES: UgcPoseItem[] = [
  {
    id: 1,
    title: "1. Puxando a Barra Lateral (Mostrando elasticidade e caimento do tecido)",
    description: "One hand gently pulling the side hem of the garment outward to show stretch, fabric weight, and how the material drapes naturally over the hips/torso."
  },
  {
    id: 2,
    title: "2. Toque no Tecido do Peito/Ombro (Evidenciando textura e costura)",
    description: "One hand delicately pinching the fabric on the chest or shoulder area to highlight the material texture, knit pattern, and quality of the garment."
  },
  {
    id: 3,
    title: "3. Ajustando a Manga ou Punho (Foco no ajuste de braço)",
    description: "Mid-action pose with one hand adjusting the cuff or sleeve length, showing the sleeve fit and arm mobility."
  },
  {
    id: 4,
    title: "4. Mãos nos Bolsos Frontais (Mostrando estrutura da calça/bermuda)",
    description: "Both hands casually tucked into the front pockets, spreading the fabric slightly to emphasize the waistline, front cut, and relaxed fit."
  },
  {
    id: 5,
    title: "5. Giro de 45 Graus de Lado (Mostrando silhueta e caimento traseiro)",
    description: "Standing at a slight 45-degree angle, turning the upper body toward the mirror to clearly display the side silhouette, length, and back fit."
  },
  {
    id: 6,
    title: "6. Puxando Levemente a Gola (Destacando decote e acabamento)",
    description: "One hand gently pulling the collar or neckline downward/forward to show collarbone fit, neck ribbing, and structural structure."
  },
  {
    id: 7,
    title: "7. Mão Espalmada na Cintura (Mostrando entalhe e marcação da cintura)",
    description: "One hand pressed flat against the waistline or belt area, defining the waist shape and showing how the garment tapers."
  },
  {
    id: 8,
    title: "8. Conferindo o Comprimento no Espelho (Inclinando o tronco à frente)",
    description: "Slight forward lean of the upper body, checking the length, hemline fall, and transparency or stretch of the fabric in the mirror."
  },
  {
    id: 9,
    title: "9. Braço Cruzado com Mão no Cotovelo (Postura casual de provador)",
    description: "One arm crossed across the torso supporting the opposite elbow, naturally pulling the front fabric taut to display body fit."
  },
  {
    id: 10,
    title: "10. Alisando a Região Frontal com as Duas Mãos (Mostrando caimento liso)",
    description: "Both hands smoothing down the front fabric from chest to waist to eliminate creases and showcase the clean fit and overall silhouette of the piece."
  },
  {
    id: 11,
    title: "11. Pose Dinâmica de Transição de Passo (Mostrando movimento da roupa)",
    description: "One foot stepping forward as if walking past the mirror, capturing realistic fabric movement, folds, and how the lower garment flows."
  },
  {
    id: 12,
    title: "12. Mão Passando pelo Cabelo com Cotovelo Elevado (Exibindo a cava/lateral da peça)",
    description: "Lifting one arm up with hand touching the hair, raising the elbow to showcase the armhole fit, side seams, and torso hugging shape."
  },
  {
    id: 13,
    title: "13. Puxando a Parte Traseira da Camisa/Blusa (Mostrando caimento das costas)",
    description: "One hand reaching back to lightly tug the back fabric, demonstrating the stretch, drape, and shoulder comfort across the back."
  },
  {
    id: 14,
    title: "14. Encostado(a) de Lado no Batente/Parede (Mostrando ajuste relaxado)",
    description: "Leaning sideways against the room structure, letting the clothing relax naturally against gravity to display its loose or fitted structure."
  },
  {
    id: 15,
    title: "15. Segurando a Lateral da Saia/Calça com os Dedos (Mostrando amplitude)",
    description: "Fingers pinching the sides of the trousers or skirt to slightly pull it outward, demonstrating fabric flare, width, and fluidity."
  },
  {
    id: 16,
    title: "16. Olhar Direto para a Peça no Espelho (Foco total no produto)",
    description: "Head tilted slightly downward, gazing directly at the clothing reflection in the mirror to inspect print placement or texture details."
  },
  {
    id: 17,
    title: "17. Mão no Bolso Traseiro / Lateral (Postura natural de influenciador)",
    description: "One hand tucked loosely into a back or side pocket, shifting weight to one hip to display how the pants/shorts hug the body curves."
  },
  {
    id: 18,
    title: "18. Ajustando o Cinto ou Cós (Detalhe de acabamento)",
    description: "One hand interacting with the waistband or belt loops, drawing natural attention to the waist fit and product hardware."
  },
  {
    id: 19,
    title: "19. Braços Soltos ao Lado do Corpo (Postura neutra de vitrine)",
    description: "Standing straight with arms relaxed naturally at the sides, displaying the true, unaltered vertical drop and length of the outfit."
  },
  {
    id: 20,
    title: "20. Sorriso de Aprovação com Polegar Levemente Erguido (Review UGC autêntico)",
    description: "Subtle expression of approval looking at the mirror reflection, casual thumbs-up near the waist to simulate an honest review video frame."
  }
];

/**
 * Builds the complete prompt for a specific UGC & Try-On pose.
 */
export function buildUgcPosePrompt(poseDescription: string): string {
  return `Create an ultra-photorealistic vertical 9:16 mirror selfie image of an attractive adult Brazilian woman wearing a stylish fashion outfit.
POSE & ACTION: ${poseDescription}
The image must look like a natural smartphone photo taken casually by a real person, featuring realistic lighting, authentic skin texture, correct human anatomy, and a believable smartphone device in her hand.
Clean background, natural environment, high-end e-commerce social media aesthetic (TikTok/Instagram Reels style).
Avoid: AI-facing look, plastic skin, distorted fingers, impossible anatomy, CGI look, watermarks.`;
}

/**
 * Builds the Virtual Try-On Prompt matching the exact template requested by the user.
 */
export function buildTryOnPrompt(clothingDesc: string, extraFabric?: string): string {
  const combinedDesc = extraFabric ? `${clothingDesc}, made of ${extraFabric}` : clothingDesc;

  return `Professional e-commerce fashion photography workflow (Virtual Try-On / Image-to-Image).
Take the exact clothing item presented in the clothing image and realistically dress the specific adult Brazilian woman shown in the reference model image. The new clothing item is: ${combinedDesc}.

CRITICAL INSTRUCTIONS FOR CLOTHING INTEGRATION:
- Seamlessly fit the new clothing item onto her body, maintaining correct anatomical proportions, realistic fabric tension, natural folds, creases, shadows, and weight.
- The clothing must wrap around her body naturally, looking like physical fabric rather than a digital overlay or photoshop cutout. 
- Preserve the exact facial features, hairstyle, identity, skin tone, body proportions, and posture of the woman from the reference model image. Do not change her face or body identity.
- Preserve the exact color, pattern, fabric texture, prints, and design details of the clothing item from the clothing input image.

ENVIRONMENT AND LIGHTING CONSISTENCY:
- Keep the exact same background environment and lighting as established in the reference model image.
- Ensure the lighting on the newly dressed clothing matches the ambient light of the environment flawlessly, with realistic highlights and soft shadows.

PHOTOGRAPHIC STYLE & REALISM:
- Maintain the authentic smartphone or commercial lifestyle look established in the reference.
- Realistic skin texture, subtle pores, natural dynamic range, and authentic fabric behavior.
- No artificial glow or plastic skin smoothing.

C R I T I C A L  R E A L I S M  R U L E S
photorealistic clothing blending anatomically correct body physics realistic fabric folds and weight accurate lighting matching reference natural posture

A V O I D
floating clothes distorted clothes mismatched lighting changing the model's face altering her body identity plastic clothing texture glossy CGI appearance 3D render digital cut-out look blurred boundaries between clothing and skin

FINAL RESULT:
An extremely realistic e-commerce fashion photo showing the exact same Brazilian model from the reference image, now naturally wearing the new clothing item, completely indistinguishable from a real photo. Aspect ratio: 9:16 vertical.`;
}

/**
 * Builds the Video & UGC Prompt matching the exact template requested by the user.
 */
export function buildVideoPrompt(movement: string, toolNote?: string): string {
  const toolSpecific = toolNote ? `\nOptimized engine parameters: ${toolNote}.` : '';

  return `Cinematic social media fashion video prompt:
A real Brazilian female influencer wearing the outfit from the reference image. 
Action/Movement: ${movement}.
Style: Shot on smartphone, vertical 9:16 video look, natural lighting, authentic everyday behavior, highly detailed texture, no artificial plastic look, realistic body physics. Ready for Instagram Reels and TikTok.${toolSpecific}`;
}

/**
 * Builds the Master 8-Second UGC Fashion Video Prompt (TikTok Shop / Reels Showcase)
 */
export function buildMasterVideoUgcPrompt(): string {
  return `Create a highly realistic 8-second vertical 9:16 UGC-style fashion video using ONLY the provided reference image.
REFERENCE IMAGE: Use the provided image as the exact visual reference for the model AND the clothing they are wearing.
The clothing worn by the model in the reference image IS THE PRODUCT.
Preserve the exact design, color, fabric appearance, texture, pattern, stitching, seams, neckline or collar, sleeves, straps if present, fit, proportions, length, shape, and construction of the clothing. Do not redesign, recolor, replace, simplify, add, or remove any clothing details.
The model's identity must remain completely consistent with the reference image. Preserve facial features, skin tone, hairstyle, body proportions, apparent age, and overall appearance.

FORMAT:
- Exactly 8 seconds
- Vertical 9:16
- Ultra-realistic fashion UGC
- Authentic Brazilian TikTok Shop / Reels aesthetic
- Smartphone camera look
- Silent video (No speech, no narration, no voice-over, no music, no text anywhere on screen)

VISUAL OBJECTIVE:
The entire video should function as a realistic fashion product showcase. The clothing is the main subject. Show the garment from multiple natural angles while maintaining the exact same model and clothing.

SHOT 1 — 0–2 seconds:
Begin with a natural medium-full shot of the model wearing the clothing exactly as shown in the reference image. Show the overall fit, silhouette, length, and how the garment sits naturally on the body. The model makes a subtle natural movement toward the camera or slightly adjusts posture. Keep the clothing clearly visible.

SHOT 2 — 2–4 seconds:
Move into a closer detail shot focused on the clothing. Show realistic fabric texture, stitching, seams, collar or neckline, sleeves, straps, buttons, zipper, print, pattern, or other visible construction details that actually exist on the garment. Use a natural smartphone camera movement, slowly moving closer to reveal the material and finishing details.

SHOT 3 — 4–6 seconds:
Show the side of the garment. The model naturally rotates approximately 45 degrees to one side, allowing the camera to clearly capture the lateral fit, fabric drape, side seams, silhouette, and how the garment fits around the body. Then make a subtle movement toward another 45-degree angle if appropriate.

SHOT 4 — 6–8 seconds:
Finish with another close or medium-full fashion angle showing the garment naturally on the model. The model makes a small natural movement that allows the fabric to move realistically and demonstrate its fit and drape. End with the clothing clearly visible and properly framed.

CAMERA AND MOVEMENT:
Use natural handheld smartphone cinematography. Camera movements should be smooth, subtle, realistic, and appropriate for authentic UGC fashion content, combining medium-full framing, close-up fabric detail, neckline/collar or strap detail, side angle, approximately 45-degree rotation, subtle camera push-in, and natural body movement. Do not make camera movements cinematic or exaggerated.

FABRIC REALISM:
Pay particular attention to realistic fabric behavior: authentic texture, realistic folds, natural creases, believable thickness, realistic stretch or structure, physically accurate draping, natural movement when the model moves, realistic highlights and shadows. Do not make the fabric look digitally painted, plastic, rubber-like, or excessively smooth.

IDENTITY AND CLOTHING CONSISTENCY:
The same model must remain throughout the entire video. The clothing must remain EXACTLY the same throughout all shots (color, pattern, print, fabric, neckline, collar, sleeves, straps, length, fit, seams, stitching, buttons, zipper, construction, proportions).

REALISM:
Use realistic skin texture, natural facial expressions, natural blinking, realistic body movement, anatomically correct hands, physically accurate lighting, realistic shadows, natural autofocus, and authentic smartphone exposure. The result should look like a real Brazilian fashion creator casually filming an 8-second clothing showcase for TikTok Shop.

ABSOLUTELY NO:
Speech, narration, voice-over, music, subtitles, captions, text, floating text, logos added by AI, watermarks, TikTok interface, additional people, wardrobe changes, different clothing, different colors, different patterns, fabric deformation, product redesign, body deformation, face changes, identity changes, extra fingers, broken hands, unnatural anatomy, plastic-looking fabric, artificial skin, cinematic commercial style, slow motion, speed ramps, exaggerated camera movements.

FINAL OBJECTIVE:
Create a silent 8-second ultra-realistic Brazilian UGC fashion video where the clothing worn by the model is the product. The video must clearly showcase the garment's overall fit, fabric texture, construction details, neckline or collar, sleeves or straps, side profile, and approximately 45-degree angles through natural model movement and realistic smartphone camera work.`;
}

/**
 * Clean UI Prompts (ModaIA Studio - Formato Direto e Objetivo)
 */
export function buildCleanModelPrompt(params: {
  gender: 'feminino' | 'masculino';
  age: number;
  hairColor: string;
  details: string;
  cenario: string;
}): string {
  if (params.gender === 'feminino') {
    return `AGE: [${params.age}+ ONLY] | HAIR: [${params.hairColor}] | DETAILS: [${params.details}]
Create an ultra-photorealistic vertical 9:16 portrait of an attractive adult Brazilian woman with a feminine, curvy, fit and naturally voluptuous body. She must look like a real Brazilian woman.
Environment: ${params.cenario}.
She is casually taking a smartphone mirror selfie with an orange iPhone 17.
Natural anatomy, feminine curves, defined waist, proportional hips, realistic skin texture, subtle pores, tiny imperfections, realistic hair strands, natural computational HDR.
Pose: Confident, subtly seductive and feminine TikTok fashion opening frame. Slightly shift weight onto one leg, angle one hip.
Temporary clothing: simple fitted casual dress or athleisure set.
A V O I D: AI-looking face, plastic skin, distorted hands, warped phone, mirror text, CGI render, anime, watermarks.`;
  }

  return `Create an ultra-photorealistic full-body vertical 9:16 portrait of a Brazilian male model/influencer in: ${params.cenario}.
Age: [${params.age} years old] | Hair/Beard: [${params.hairColor}] | Details: [${params.details}].
Framing from the knees up, showing upper body, torso, waist, hips, and legs.
Natural masculine facial features, realistic skin texture, small imperfections, casual smartphone photo lighting.
Pose: Relaxed, natural, masculine, content creator style.
A V O I D: AI filters, plastic skin, cinematic glow, bad anatomy, text, watermarks.`;
}

export function buildCleanIsolationPrompt(): string {
  return `Use the reference image of the person wearing the outfit only to identify and reconstruct the clothing set.
Generate a realistic product-only image of the exact outfit with NO person wearing it.
Show the full outfit as a clean flat-lay product presentation on a plain light background. Arrange pieces neatly.
No person, face, skin, hands, or mannequin. Soft natural lighting, clean shadows, realistic fabric texture. E-commerce ready.`;
}

export function buildCleanTryOnPrompt(): string {
  return `Use Image A as main identity and environment reference, and Image B exclusively as clothing reference.
- Image A: Preserve 100% the person (face, body) and environment (room, mirror, lighting). Do not change background.
- Image B: Transfer the exact clothing item onto the person from Image A.
Preserve clothing design, colors, fabric appearance, and fit.
A V O I D: Background changes, identity drift, warped mirror, plastic skin, CGI.`;
}

export function buildCleanScenarioPrompt(): string {
  return `Use Image A as base for composition, camera angle, perspective, environment, and lighting.
Use Image B for the person's identity, facial features, hair, and body.
Place the person from Image B into the environment of Image A seamlessly.
Preserve 100% identity from B and 100% environment from A. Ultra-realistic photo result.`;
}

export const CLEAN_POSES: Record<string, string> = {
  "Puxando a Barra Lateral (Elasticidade)": "One hand gently pulling the side hem of the garment outward to show stretch and fabric weight.",
  "Toque no Tecido do Peito/Ombro (Textura)": "One hand delicately pinching fabric on chest/shoulder to highlight material texture and knit pattern.",
  "Ajustando a Manga ou Punho": "Mid-action pose adjusting cuff or sleeve length, showing arm mobility.",
  "Mãos nos Bolsos Frontais": "Both hands casually tucked into front pockets, spreading fabric to emphasize waistline and relaxed fit.",
  "Giro de 45 Graus de Lado": "Standing at a 45-degree angle, turning upper body toward mirror to display side silhouette and back fit.",
  "Puxando Levemente a Gola": "One hand gently pulling collar/neckline to show collarbone fit and structure.",
  "Mão Espalmada na Cintura": "Hand pressed flat against waistline, defining waist shape and garment taper.",
  "Conferindo Comprimento (Tronco à frente)": "Slight forward lean checking length and hemline fall in mirror.",
  "Braço Cruzado com Mão no Cotovelo": "Arm crossed across torso supporting opposite elbow, pulling front fabric taut.",
  "Alisando a Região Frontal": "Both hands smoothing down front fabric from chest to waist to show clean silhouette."
};

export function buildCleanPosePrompt(acao: string): string {
  return `STRICT UGC CLOTHING FIT & POSE PROMPT:
Using reference image, keep person's face, identity, hair, clothing item, and background 100% identical.
ONLY change body posture to execute: ${acao}.
Do not change clothing or background. Keep authentic smartphone UGC aesthetic.`;
}

export function buildCleanVideoUgcPrompt(): string {
  return `Create an 8-second vertical 9:16 UGC fashion video using ONLY the reference image.
The clothing worn by the model IS THE PRODUCT. Preserve exact design, color, fabric, and model identity.
- Shot 1 (0-2s): Medium-full shot showing overall fit and natural movement.
- Shot 2 (2-4s): Close-up detail shot of fabric texture, stitching, collar/sleeves.
- Shot 3 (4-6s): 45-degree side rotation showing lateral fit and drape.
- Shot 4 (6-8s): Final fashion angle with natural movement.
Silent video, smartphone camera movement, realistic fabric behavior, authentic Brazilian creator style. No text, captions, or watermarks.`;
}
