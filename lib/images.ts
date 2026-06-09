export const CATEGORY_IMAGES: Record<string, string[]> = {
  hotel:    ["/card-hotel.png"],
  hospital: ["/card-hospital.png"],
  grooming: ["/card-grooming.png"],
  training: ["/card-training.png"],
  sitter:   ["/card-sitter.png"],
  cafe:     ["/card-hotel.png"],
  park:     ["/card-training.png"],
  supply:   ["/card-grooming.png"],
  taxi:     ["/card-sitter.png"],
  photo:    ["/card-hospital.png"],
};

export function getCategoryImage(category: string, id?: number): string {
  const images = CATEGORY_IMAGES[category] ?? CATEGORY_IMAGES["hotel"];
  const index = id ? id % images.length : 0;
  return images[index];
}
