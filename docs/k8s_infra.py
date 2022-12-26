from urllib.request import urlretrieve
from diagrams.aws.database import Aurora
from diagrams import Cluster, Diagram
from diagrams.custom import Custom
from diagrams.k8s.compute import Pod, StatefulSet
from diagrams.k8s.network import Service
from diagrams.k8s.storage import PV, PVC, StorageClass

rabbitmq_url = "https://jpadilla.github.io/rabbitmqapp/assets/img/icon.png"
rabbitmq_icon = "rabbitmq.png"
urlretrieve(rabbitmq_url, rabbitmq_icon)

with Diagram("TripApp Architecture", show=False):

    with Cluster("App"):
        svc = Service("svc")
        sts = StatefulSet("sts")

        apps = []
        for _ in range(3):
            pod = Pod("pod")
            pvc = PVC("pvc")
            pod - sts - pvc
            apps.append(svc >> pod >> pvc)



    apps << PV("pv") << StorageClass("sc")

    with Cluster("RabbitMQ Consumers"):
        consumers = [
            Pod("Spring MicroSVC"),
            Pod("Spring MicroSVC"),
            Pod("Spring MicroSVC")]

    queue = Custom("Message queue", rabbitmq_icon)

    queue >> consumers >> Aurora("Database")
