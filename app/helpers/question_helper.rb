module QuestionHelper
  def question_header(question)
    test_title = question.test.title
    question.new_record? ? "Create new '#{test_title}' Question" : "Edit '#{test_title}' Question"
  end
end
