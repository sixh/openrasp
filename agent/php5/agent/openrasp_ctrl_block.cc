/*
 * Copyright 2017-2018 Baidu Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

extern "C"
{
    #include <stdio.h>
}
#include <string.h>
#include <unistd.h>
#include "openrasp_ctrl_block.h"

namespace openrasp
{

void OpenraspCtrlBlock::set_supervisor_id(pid_t supervisor_id)
{
    this->supervisor_id = supervisor_id;
}

pid_t OpenraspCtrlBlock::get_supervisor_id()
{
    return supervisor_id;
}

void OpenraspCtrlBlock::set_plugin_agent_id(pid_t plugin_agent_id)
{
    this->plugin_agent_id = plugin_agent_id;
}

pid_t OpenraspCtrlBlock::get_plugin_agent_id()
{
    return plugin_agent_id;
}

void OpenraspCtrlBlock::set_log_agent_id(pid_t log_agent_id)
{
    this->log_agent_id = log_agent_id;
}

pid_t OpenraspCtrlBlock::get_log_agent_id()
{
    return log_agent_id;
}

void OpenraspCtrlBlock::set_plugin_version(const char* plugin_version)
{
    strncpy(this->plugin_version, plugin_version, PLIGIN_VERSION_MAX_SIZE);
    last_update_time = (long)time(nullptr);
}

const char *OpenraspCtrlBlock::get_plugin_version()
{
    return plugin_version;
}

long OpenraspCtrlBlock::get_last_update_time()
{
    return last_update_time;
}

} // namespace openrasp
