// Deterministic "real photo" cover per deck (Unsplash, education/language themed).
const COVERS = [
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80&auto=format&fit=crop",
];

/** Pick a stable cover image for a deck based on its id. */
export function deckCover(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (Math.imul(h, 31) + id.charCodeAt(i)) >>> 0;
  return COVERS[h % COVERS.length];
}
