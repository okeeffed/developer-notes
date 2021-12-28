import create from "zustand";

interface SelectedImage {
  src: string | null;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setImage: (img: string) => void;
}

export const useSelectedImage = create<SelectedImage>((set) => ({
  src: null,
  isOpen: false,
  onOpen: () => set((state) => ({ ...state, isOpen: true })),
  onClose: () => set((state) => ({ ...state, isOpen: false })),
  setImage: (img: string) => set((state) => ({ ...state, src: img })),
}));
