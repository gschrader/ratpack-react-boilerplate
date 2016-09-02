package ratpack.react

import com.google.common.collect.EvictingQueue

import java.lang.management.ManagementFactory

class JVMDataService {
    def points = EvictingQueue.create(3600)
    def last

    JVMDataService() {
        new Timer().schedule({
            last = [
                    uptime: ManagementFactory.runtimeMXBean.getUptime(),
                    free  : Runtime.runtime.freeMemory(),
                    max   : Runtime.runtime.maxMemory(),
                    used  : Runtime.runtime.totalMemory() - Runtime.runtime.freeMemory(),
                    total : Runtime.runtime.totalMemory(),
                    cpu   : ManagementFactory.operatingSystemMXBean.systemCpuLoad,
                    gc    : ManagementFactory.garbageCollectorMXBeans.get(0).collectionTime
            ]
            points.add(last)

        }, 0, 1000)
    }

}
