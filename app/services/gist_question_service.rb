class GistQuestionService
  ACCESS_TOKEN = ENV['GITHUB_TOKEN']
  SUCCESS_STATUS = 201

  def initialize(question, client: nil)
    @question = question
    @test = @question.test
    @client = client || Octokit::Client.new(access_token: ACCESS_TOKEN)
  end

  def call
    @client.create_gist(gist_params)
  end

  def success?
    @client.last_response.status == SUCCESS_STATUS
  end

  private

  def gist_params
    {
      description: I18n.t('main.gist_service.description', test_title: @test.title),
      files: {
        'test-guru-question.txt' => {
          content: gist_content
        }
      }
    }
  end

  def gist_content
    content = [@question.body]
    content += @question.answers.pluck(:body)
    content.join("\n")
  end
end
