import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        data: {
            type: String,
            default: "value"
        }
    },
    setup(props) {
        return () => 
        <>
            <div>{props.data}</div>
        </>
    }
})