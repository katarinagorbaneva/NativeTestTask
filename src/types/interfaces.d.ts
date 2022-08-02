// Описание типа данных новости
export interface NewsProps {
  id: string | number, // айди
  title: string, // заголовок
  image_url: string, // картинка
  short_text: string, // краткое описание
  created_at: string, // когда создана
  body: string // тело новости
}
