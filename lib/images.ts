// 카테고리별 Unsplash 대표 이미지 (무료 사용 가능)
export const CATEGORY_IMAGES: Record<string, string[]> = {
  hotel: [
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop", // 강아지 침대
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop", // 강아지 소파
    "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=400&h=300&fit=crop", // 강아지 호텔
  ],
  hospital: [
    "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=400&h=300&fit=crop", // 동물병원
    "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&h=300&fit=crop", // 수의사
    "https://images.unsplash.com/photo-1559190394-df5a28aab5c5?w=400&h=300&fit=crop", // 진료
  ],
  cafe: [
    "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=300&fit=crop", // 펫카페 고양이
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop", // 고양이 카페
    "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400&h=300&fit=crop", // 고양이
  ],
  park: [
    "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop", // 강아지 공원 산책
    "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400&h=300&fit=crop", // 강아지 달리기
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", // 강아지 공원
  ],
  grooming: [
    "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&h=300&fit=crop", // 강아지 미용
    "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=400&h=300&fit=crop", // 미용 후 강아지
    "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop", // 고양이 미용
  ],
  training: [
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop", // 훈련
    "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400&h=300&fit=crop", // 강아지 훈련
    "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=400&h=300&fit=crop", // 훈련소
  ],
  sitter: [
    "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=300&fit=crop", // 펫시터
    "https://images.unsplash.com/photo-1521673461164-de300ebcfb17?w=400&h=300&fit=crop", // 사람과 강아지
    "https://images.unsplash.com/photo-1534361960057-19f4434c8f50?w=400&h=300&fit=crop", // 강아지 돌봄
  ],
  supply: [
    "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=400&h=300&fit=crop", // 펫 용품
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop", // 펫샵
    "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=400&h=300&fit=crop", // 강아지 장난감
  ],
  taxi: [
    "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=400&h=300&fit=crop", // 이동
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop", // 이동장
  ],
  photo: [
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop", // 강아지 사진
    "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=400&h=300&fit=crop", // 포즈
  ],
};

// id 기반으로 이미지를 분산 (같은 카테고리라도 다양하게)
export function getCategoryImage(category: string, id?: number): string {
  const images = CATEGORY_IMAGES[category] ?? CATEGORY_IMAGES["hotel"];
  const index = id ? id % images.length : 0;
  return images[index];
}
