terraform {
  required_providers {
    kubernetes = {
      source = "hashicorp/kubernetes"
    }
  }
}

provider "kubernetes" {
  config_path    = "~/.kube/config"
  config_context = "minikube"
}

resource "notebook_deployment" "notebook" {
  metadata {
    name = "notebook"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "notebook"
      }
    }

    template {
      metadata {
        labels = {
          app = "notebook"
        }
      }

      spec {
        container {
          image = "igelo/notebook-app"
          name  = "example-container"
        }
      }
    }
  }
}

resource "kubernetes_service" "example" {
  metadata {
    name = "notebook-service"
  }

  spec {
    selector = {
      app = "notebook"
    }

    port {
      port        = 80
      target_port = 80
      node_port = 30080
    }

    type = "NodePort"
  }
}