class Test < ApplicationRecord
  has_many :questions
  belongs_to :author, class_name: "User", foreign_key: 'author_id'
  belongs_to :category
  has_and_belongs_to_many :users

  validates :title, presence: true
  validates :title, uniqueness: { scope: :level }
  validates :level, numericality: { only_integer: true,
                      greater_than_or_equal_to: 0 }

  scope :simple, -> { where(level: 0..1) }
  scope :medium, -> { where(level: 2..4) }
  scope :hard, -> { where('level >= 5') }

  scope :ordered_tests, ->(category) { joins(:category).
    where(categories: { title: category }).order(id: :desc) }
end
