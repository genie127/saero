export type TestQuestionType = {
  id: number;
  category: string;
  categoryId: string;
  question: string;
  options: string[];
};

export type TestQuestionListType = TestQuestionType[];