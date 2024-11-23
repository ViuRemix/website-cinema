import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Cấu hình các ngôn ngữ
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        movie_overview:
          "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
      },
    },
    vi: {
      translation: {
        movie_overview:
          "Batman nâng cao mức độ quyết liệt trong cuộc chiến chống tội phạm. Với sự giúp đỡ của Trung úy Jim Gordon và Công tố viên Harvey Dent, Batman bắt đầu phá hủy các tổ chức tội phạm còn lại đang hoành hành trên các con phố. Mối quan hệ hợp tác này chứng tỏ hiệu quả, nhưng họ sớm nhận ra rằng mình trở thành con mồi của một cuộc triều đại hỗn loạn do một bậc thầy tội phạm đang nổi lên, được những công dân sợ hãi của Gotham gọi là Joker.",
      },
    },
  },
  lng: "en", // Ngôn ngữ mặc định
  fallbackLng: "en", // Ngôn ngữ dự phòng
  interpolation: {
    escapeValue: false, // Không cần escape giá trị
  },
});

export default i18n;
