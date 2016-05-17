class Service < ActiveRecord::Base
  extend ActsAsTree::TreeView
  acts_as_tree order: :name
  has_many :providers
end
