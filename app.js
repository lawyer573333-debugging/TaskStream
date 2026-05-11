document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyze-btn');
    const emailInput = document.getElementById('email-input');
    const resultsSection = document.getElementById('results-section');
    const btnText = analyzeBtn.querySelector('.btn-text');
    const btnLoader = document.getElementById('btn-loader');

    const todoList = document.getElementById('todo-list');
    const draftOutput = document.getElementById('draft-output');
    const copyBtn = document.getElementById('copy-btn');

    analyzeBtn.addEventListener('click', () => {
        const text = emailInput.value.trim();
        if (!text) {
            alert('Please paste an email or request first.');
            return;
        }

        // Simulate AI Processing
        simulateAIProcessing();
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(draftOutput.innerText).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = 'Copied!';
            setTimeout(() => {
                copyBtn.innerText = originalText;
            }, 2000);
        });
    });

    function simulateAIProcessing() {
        // UI Loading State
        analyzeBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'block';
        resultsSection.classList.add('hidden');
        resultsSection.style.position = 'absolute';

        // Clear previous tasks
        todoList.innerHTML = '';

        // Fake 2-second processing time
        setTimeout(() => {
            // Restore Button State
            analyzeBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';

            // Show Results
            resultsSection.style.position = 'relative';
            resultsSection.classList.remove('hidden');

            // Inject Mock Data
            injectResults();
        }, 2000);
    }

    function injectResults() {
        const tasks = [
            "Create new logo variations",
            "Update website footer with new links",
            "Draft concepts for the new blog section"
        ];

        const clarificationDraft = `Hi [Client Name],

Thanks for sending this over! I've added the logo variations and website footer updates to my queue for tomorrow.

Regarding the new blog section, could you clarify what specific topics or categories you'd like us to focus on for the initial launch? Also, do you have any preferred design references for the blog layout?

Let me know!
Best,
[Your Name]`;

        // Render Tasks with staggered animation
        tasks.forEach((task, index) => {
            const taskEl = document.createElement('div');
            taskEl.className = 'task-card';
            taskEl.innerText = task;
            taskEl.style.animationDelay = `${index * 0.15}s`;
            todoList.appendChild(taskEl);
        });

        // Typewriter effect for the email draft
        draftOutput.innerHTML = '';
        let i = 0;
        draftOutput.style.minHeight = '150px'; // Prevent layout shift

        function typeWriter() {
            if (i < clarificationDraft.length) {
                draftOutput.innerHTML += clarificationDraft.charAt(i);
                i++;
                setTimeout(typeWriter, 10);
            }
        }
        typeWriter();
    }
});
