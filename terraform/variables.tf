variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "rg-librarian-demo"
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "North Europe"
}

variable "app_name" {
  description = "Name of the application (must be globally unique)"
  type        = string
}

variable "sql_admin_username" {
  description = "SQL Server admin username"
  type        = string
  sensitive   = true
}

variable "sql_admin_password" {
  description = "SQL Server admin password"
  type        = string
  sensitive   = true
}

variable "my_ip_address" {
  description = "Your IP address for SQL firewall rule"
  type        = string
}