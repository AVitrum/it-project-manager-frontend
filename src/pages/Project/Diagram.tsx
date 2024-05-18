import { useNavigate, useParams } from 'react-router-dom';
import { useGetTasksQuery } from '../../features/task/getAllTasksByProjectIdApiSlice';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import "../../assets/project.css";
import { AssignmentResponse } from '../../types/responses';

function DiagramPage() {
    const { id, companyId } = useParams<string>();
    const navigate = useNavigate();

    const {
        data,
        isLoading,
        isSuccess
    } = useGetTasksQuery({ id: id });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isSuccess || !data) {
        return <div>Error loading data</div>;
    }

    const tasks: AssignmentResponse[] = data;

    const taskTypeCounts = tasks.reduce((acc, task) => {
        if (!acc[task.type]) {
            acc[task.type] = 0;
        }
        acc[task.type]++;
        return acc;
    }, {} as Record<string, number>);

    const budgetByType = tasks.reduce((acc, task) => {
        if (!acc[task.type]) {
            acc[task.type] = 0;
        }
        acc[task.type] += task.budget;
        return acc;
    }, {} as Record<string, number>);

    const colors: Record<string, string> = {
        OVERDUE: '#FF6384',
        COMPLETED: '#36A2EB',
        IN_REVIEW: '#FFCE56',
    };

    const chartData = {
        labels: Object.keys(taskTypeCounts),
        datasets: [
            {
                label: 'Task Types',
                data: Object.values(taskTypeCounts),
                backgroundColor: Object.keys(taskTypeCounts).map(key => colors[key] || '#CCCCCC'),
                hoverBackgroundColor: Object.keys(taskTypeCounts).map(key => colors[key] || '#CCCCCC')
            }
        ]
    };

    const budgetChartData = {
        labels: ['Completed', 'Overdue'],
        datasets: [
            {
                label: 'Budget',
                data: [budgetByType['COMPLETED'] || 0, budgetByType['OVERDUE'] || 0],
                backgroundColor: [colors['COMPLETED'], colors['OVERDUE']],
                hoverBackgroundColor: [colors['COMPLETED'], colors['OVERDUE']]
            }
        ]
    };

    const chartOptions = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        }
    };

    const hasTaskTypeData = Object.keys(taskTypeCounts).length > 0;
    const hasBudgetData = budgetByType['COMPLETED'] || budgetByType['OVERDUE'];

    return (
        <div className="main-project-container">
            <div className="project-centered-content">
                <h1>Tasks Analytics</h1>
                <br></br>
                <div className="charts-container">
                    {hasTaskTypeData && (
                        <div className="chart">
                            <h2>Tasks</h2>
                            <Doughnut
                                data={chartData}
                                options={chartOptions}
                            />
                            <div className="legend">
                                <p><span className="legend-color" style={{ backgroundColor: colors['OVERDUE'] }}></span> Overdue</p>
                                <p><span className="legend-color" style={{ backgroundColor: colors['COMPLETED'] }}></span> Completed</p>
                                <p><span className="legend-color" style={{ backgroundColor: colors['IN_REVIEW'] }}></span> In Review</p>
                            </div>
                        </div>
                    )}
                    {hasBudgetData && (
                        <div className="chart">
                            <h2>Budget</h2>
                            <Doughnut
                                data={budgetChartData}
                                options={chartOptions}
                            />
                            <div className="legend">
                                <p><span className="legend-color" style={{ backgroundColor: colors['COMPLETED'] }}></span> Completed</p>
                                <p><span className="legend-color" style={{ backgroundColor: colors['OVERDUE'] }}></span> Overdue</p>
                            </div>
                        </div>
                    )}
                </div>
                <br />
                {hasBudgetData && (
                    <>
                        <h2>Budget Allocation</h2>
                        <p>Completed Tasks Budget: ${budgetByType['COMPLETED'] || 0}</p>
                        <p>Overdue Tasks Budget: ${budgetByType['OVERDUE'] || 0}</p>
                    </>
                )}
                <button className="task-button" onClick={() => navigate(`/${companyId}/project/${id}/tasks`)}>Back</button>
            </div>
        </div>
    );
}

export default DiagramPage;
